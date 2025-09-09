import { useState } from 'react'
import './App.css'

interface Zone {
  id: string
  name: string
  type: 'Ambazone' | 'Virtual area' | 'No-go zone'
  description: string
  details: string
}

const zones: Zone[] = [
  {
    id: '1',
    name: 'Mexico City Area',
    type: 'Ambazone',
    description: 'Ambazone • Capacity 15',
    details: 'Ambazone - это специальная зона с повышенным уровнем безопасности. Включает в себя мониторинг 24/7, автоматические системы оповещения и координацию с местными службами безопасности.'
  },
  {
    id: '2',
    name: 'Mexico City Virtual 1',
    type: 'Virtual area',
    description: 'Virtual area • Delta capacity 3',
    details: 'Virtual area - это виртуальная зона, созданная для тестирования и симуляции различных сценариев. Не имеет физических границ, но контролируется через цифровые системы.'
  },
  {
    id: '3',
    name: 'Mexico City Virtual 2',
    type: 'Virtual area',
    description: 'Virtual area • Delta capacity 3',
    details: 'Вторая виртуальная зона для расширенного тестирования функциональности. Позволяет моделировать сложные сценарии взаимодействия между различными зонами.'
  },
  {
    id: '4',
    name: 'Mexico City No-go 1',
    type: 'No-go zone',
    description: 'No-go zone',
    details: 'No-go zone - это зона с полным запретом доступа. Включает в себя физические барьеры, системы видеонаблюдения и автоматические предупреждения при попытке проникновения.'
  },
  {
    id: '5',
    name: 'Mexico City No-go 2',
    type: 'No-go zone',
    description: 'No-go zone',
    details: 'Вторая запретная зона с максимальным уровнем защиты. Используется для защиты критически важных объектов и инфраструктуры.'
  }
]

function App() {
  const [expandedZone, setExpandedZone] = useState<string | null>(null)
  const [selectedSvg, setSelectedSvg] = useState<string | null>(null)
  const [hoveredSvg, setHoveredSvg] = useState<string | null>(null)
  const [closingZone, setClosingZone] = useState<string | null>(null)

  const toggleZone = (zoneId: string) => {
    if (expandedZone === zoneId) {
      // Закрываем зону с анимацией
      setClosingZone(zoneId)
      setTimeout(() => {
        setExpandedZone(null)
        setClosingZone(null)
      }, 300) // Время анимации
    } else {
      // Открываем зону
      setExpandedZone(zoneId)
    }
    
    // Синхронизируем с SVG зоной
    const svgIdMap: { [key: string]: string } = {
      '1': 'ambazone',
      '2': 'virtual-1',
      '3': 'virtual-2',
      '4': 'no-go-1',
      '5': 'no-go-2'
    }
    const svgId = svgIdMap[zoneId]
    if (svgId) {
      if (expandedZone === zoneId) {
        setSelectedSvg(null)
      } else {
        setSelectedSvg(svgId)
      }
    }
  }

  const getZoneTypeClass = (type: string) => {
    switch (type) {
      case 'Ambazone':
        return 'zone-ambazone'
      case 'Virtual area':
        return 'zone-virtual'
      case 'No-go zone':
        return 'zone-no-go'
      default:
        return ''
    }
  }

  const handleSvgClick = (svgId: string) => {
    const newSelectedSvg = selectedSvg === svgId ? null : svgId
    setSelectedSvg(newSelectedSvg)
    
    // Синхронизируем с аккордеоном
    const zoneIdMap: { [key: string]: string } = {
      'ambazone': '1',
      'virtual-1': '2',
      'virtual-2': '3',
      'no-go-1': '4',
      'no-go-2': '5'
    }
    const zoneId = zoneIdMap[svgId]
    if (zoneId) {
      setExpandedZone(newSelectedSvg ? zoneId : null)
    }
  }

  const handleSvgMouseEnter = (svgId: string) => {
    setHoveredSvg(svgId)
  }

  const handleSvgMouseLeave = () => {
    setHoveredSvg(null)
  }

  const handleZoneMouseEnter = (zoneId: string) => {
    // Сопоставляем ID зоны с ID SVG
    const svgIdMap: { [key: string]: string } = {
      '1': 'ambazone',
      '2': 'virtual-1',
      '3': 'virtual-2',
      '4': 'no-go-1',
      '5': 'no-go-2'
    }
    setHoveredSvg(svgIdMap[zoneId])
  }

  const handleZoneMouseLeave = () => {
    setHoveredSvg(null)
  }

  return (
    <div className="app">
      {/* Карта с фиксированными размерами */}
      <div className="map-container">
        <img src="/png/map.png" alt="Map" className="map-fixed" />
      </div>
      
      <div className="city-select">
        <div className="city-select-field">
          <div className="city-label">City</div>
          <div className="city-value">Mexico City North</div>
          <div className="city-arrow">
            <img 
              src="/svg/icon-chevron-down.svg" 
              alt="chevron" 
              className="chevron-icon"
            />
          </div>
        </div>
      </div>
      
      {/* SVG зоны на карте */}
      <div className="svg-zones">
        {/* Ambazone - под остальными */}
        <svg 
          className={`svg-zone svg-ambazone ${selectedSvg === 'ambazone' ? 'selected' : ''} ${hoveredSvg === 'ambazone' ? 'hovered' : ''}`}
          width="437" 
          height="538" 
          viewBox="0 0 437 538" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleSvgClick('ambazone')}
          onMouseEnter={() => handleSvgMouseEnter('ambazone')}
          onMouseLeave={handleSvgMouseLeave}
        >
          <path d="M306.042 1.10254C306.25 1.06384 306.465 1.0922 306.656 1.18359L364.568 28.9023L364.621 28.9277L364.677 28.9463L406.236 43.125C406.533 43.2261 406.764 43.4606 406.862 43.7578L427.449 106.008C427.483 106.109 427.5 106.216 427.5 106.322V223.254C427.5 223.438 427.517 223.621 427.551 223.802L427.59 223.981L435.564 255.882C435.694 256.402 435.391 256.931 434.877 257.083L398.533 267.8C397.751 268.031 397.096 268.57 396.72 269.294L364.392 331.502C364.119 332.027 364.008 332.621 364.071 333.209L372.479 410.863C372.488 410.944 372.487 411.027 372.476 411.107L364.098 472.216C364.076 472.374 364.017 472.524 363.927 472.653L363.826 472.775L320.648 517.425C320.528 517.549 320.377 517.641 320.211 517.689L254.913 536.837C254.689 536.903 254.448 536.888 254.233 536.795L176.442 503.102L121.848 472.33C121.73 472.264 121.627 472.174 121.545 472.067V472.066L75.3105 411.719C74.4277 410.567 72.8463 410.211 71.5557 410.876L25.709 434.48C25.0151 434.838 24.1978 434.298 24.2539 433.52L33.9619 299.067C33.9971 298.58 33.9128 298.09 33.7158 297.643L1.41504 224.232C1.26207 223.885 1.3191 223.48 1.5625 223.188L50.915 164.063C51.2614 163.648 51.4891 163.147 51.5742 162.613L64.3652 82.4219C64.4045 82.176 64.5349 81.9532 64.7295 81.7979L130.188 29.5293C130.476 29.2992 130.867 29.2461 131.206 29.3916L185.143 52.5752C186.736 53.2601 188.577 52.4545 189.155 50.8193L199.558 21.4219C199.677 21.0853 199.966 20.8378 200.317 20.7725L306.042 1.10254Z" fill="#009F38" fillOpacity="0.08" stroke="#10BA4C" strokeWidth="2"/>
        </svg>
        
        {/* Остальные зоны поверх ambazone */}
        <svg 
          className={`svg-zone svg-virtual ${selectedSvg === 'virtual-1' ? 'selected' : ''} ${hoveredSvg === 'virtual-1' ? 'hovered' : ''}`}
          width="77" 
          height="56" 
          viewBox="0 0 77 56" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleSvgClick('virtual-1')}
          onMouseEnter={() => handleSvgMouseEnter('virtual-1')}
          onMouseLeave={handleSvgMouseLeave}
        >
          <path d="M1.5 2.76465C1.5 2.01785 2.28878 1.53485 2.9541 1.87402L39.4932 20.5L49.2588 27.0342C51.1106 28.2732 53.6188 27.1328 53.9023 24.9229L55.7295 10.6738C55.8013 10.1141 56.3217 9.72457 56.8789 9.81348L66.6934 11.3838C66.9037 11.4175 67.0985 11.5172 67.248 11.6689L74.7754 19.3105C75.0776 19.6173 75.1497 20.0832 74.9541 20.4668L60.3047 49.1816C60.0994 49.584 59.65 49.7991 59.208 49.7061L43.123 46.3193C41.8549 46.0525 40.5587 46.6305 39.9092 47.752L36.4922 53.6543C36.1549 54.2367 35.3498 54.3258 34.8926 53.832L24.3867 42.4854C24.2345 42.321 24.0638 42.1743 23.8789 42.0479L14.8105 35.8428C14.7291 35.7871 14.6564 35.7196 14.5947 35.6426L1.71973 19.5596C1.57778 19.3823 1.50003 19.1617 1.5 18.9346V2.76465Z" fill="#1751E5" fillOpacity="0.16" stroke="#548EFF" strokeWidth="2"/>
        </svg>
        
        <svg 
          className={`svg-zone svg-virtual ${selectedSvg === 'virtual-2' ? 'selected' : ''} ${hoveredSvg === 'virtual-2' ? 'hovered' : ''}`}
          width="77" 
          height="56" 
          viewBox="0 0 77 56" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleSvgClick('virtual-2')}
          onMouseEnter={() => handleSvgMouseEnter('virtual-2')}
          onMouseLeave={handleSvgMouseLeave}
        >
          <path d="M22.709 1.5166L51.874 3.49316L68.124 6.65332C68.6087 6.7476 68.9524 7.18242 68.9326 7.67578L68.0537 29.625C68.0375 30.029 67.7798 30.3836 67.4004 30.5234L59.5352 33.4219C59.4096 33.4681 59.2752 33.4887 59.1416 33.4824L17.4551 31.5205C17.0516 31.5015 16.6482 31.5645 16.2695 31.7051L3.23535 36.5459C2.43391 36.8436 1.65267 36.0636 1.94922 35.2617L13.5547 3.88281C13.6739 3.56049 13.9508 3.32178 14.2871 3.25098L22.4346 1.53516C22.5245 1.51623 22.6173 1.51039 22.709 1.5166Z" fill="#1751E5" fillOpacity="0.16" stroke="#548EFF" strokeWidth="2"/>
        </svg>
        
        <svg 
          className={`svg-zone svg-no-go ${selectedSvg === 'no-go-1' ? 'selected' : ''} ${hoveredSvg === 'no-go-1' ? 'hovered' : ''}`}
          width="173" 
          height="120" 
          viewBox="0 0 173 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick={() => handleSvgClick('no-go-1')}
          onMouseEnter={() => handleSvgMouseEnter('no-go-1')}
          onMouseLeave={handleSvgMouseLeave}
        >
          <path d="M51.7363 1.125L117.711 6.33398C117.821 6.3427 117.93 6.36896 118.031 6.41309L134.695 13.6572C135.429 13.976 136.259 13.9895 137.002 13.6934L166.622 1.88477C167.229 1.64314 167.902 2.0393 167.984 2.6875L171.888 33.373C171.926 33.6713 171.827 33.9707 171.62 34.1885L159.107 47.335C158.577 47.8927 158.281 48.6334 158.281 49.4033V52.7861C158.281 52.9534 158.238 53.1178 158.158 53.2646L147.408 72.957C147.196 73.3459 146.752 73.5486 146.319 73.4551L108.081 65.1816C106.364 64.8102 104.697 65.9864 104.472 67.7285L98.9062 110.779C98.8524 111.195 98.5452 111.533 98.1367 111.626L66.9424 118.742C66.5637 118.828 66.1691 118.687 65.9307 118.381L37.5312 81.8496C37.2698 81.5133 36.9393 81.2359 36.5625 81.0371L2.39941 63.0098C1.73371 62.6585 1.67979 61.725 2.30078 61.2998L40.1338 35.418C40.7048 35.0272 41.1234 34.451 41.3184 33.7871L50.6982 1.83984C50.8316 1.3859 51.2647 1.08776 51.7363 1.125Z" fill="url(#pattern0_9867_45093)" stroke="#FE1212" strokeWidth="2"/>
          <defs>
            <pattern id="pattern0_9867_45093" patternUnits="userSpaceOnUse" patternTransform="matrix(27.75 0 0 48 0.493818 0.0533373)" preserveAspectRatio="none" viewBox="0 0 37 64" width="1" height="1">
              <g id="pattern0_9867_45093_inner">
                <g clipPath="url(#clip0_9867_45093)">
                  <rect x="15.2871" y="-16.6411" width="8" height="80" transform="rotate(30 15.2871 -16.6411)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="29.1445" y="-8.64111" width="8" height="80" transform="rotate(30 29.1445 -8.64111)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="43" y="-0.641113" width="8" height="80" transform="rotate(30 43 -0.641113)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="56.8574" y="7.35889" width="8" height="80" transform="rotate(30 56.8574 7.35889)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="70.7129" y="15.3589" width="8" height="80" transform="rotate(30 70.7129 15.3589)" fill="#FF0000" fillOpacity="0.16"/>
                </g>
              </g>
            </pattern>
            <clipPath id="clip0_9867_45093">
              <rect width="37" height="64" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        
        <svg 
          className={`svg-zone svg-no-go ${selectedSvg === 'no-go-2' ? 'selected' : ''} ${hoveredSvg === 'no-go-2' ? 'hovered' : ''}`}
          width="173" 
          height="120" 
          viewBox="0 0 173 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick={() => handleSvgClick('no-go-2')}
          onMouseEnter={() => handleSvgMouseEnter('no-go-2')}
          onMouseLeave={handleSvgMouseLeave}
        >
          <path d="M40.7793 1H64.5811C65.2086 1.00023 65.6805 1.57209 65.5625 2.18848L62.0957 20.2969C61.6881 22.426 63.6035 24.2713 65.7158 23.7842L66.3105 23.6465C67.0045 23.4863 67.6383 24.0827 67.5215 24.7852L62.6152 54.2236C62.5156 54.8217 62.6001 55.436 62.8564 55.9854L65.8281 62.3525C66.0878 62.909 66.5116 63.373 67.043 63.6807L75.6113 68.6406C75.7389 68.7145 75.8487 68.8163 75.9326 68.9375L79.5195 74.1191C79.723 74.4131 79.7546 74.7931 79.6016 75.1162L76.2051 82.2861C76.0227 82.6709 75.6167 82.8986 75.1934 82.8525L31.4111 78.0928C31.1536 78.0648 30.9168 77.9383 30.751 77.7393L9.05371 51.7021C8.95979 51.5894 8.89163 51.4574 8.85449 51.3154L1.12305 21.7529C0.957343 21.1192 1.43579 20.5 2.09082 20.5H29.2207C30.3907 20.4999 31.454 19.8192 31.9443 18.7568L39.8721 1.58105C40.0355 1.22704 40.3894 1.00014 40.7793 1Z" fill="url(#pattern0_9867_45094)" stroke="#FE1212" strokeWidth="2"/>
          <defs>
            <pattern id="pattern0_9867_45094" patternUnits="userSpaceOnUse" patternTransform="matrix(27.75 0 0 48 -0.17606 0)" preserveAspectRatio="none" viewBox="0 0 37 64" width="1" height="1">
              <g id="pattern0_9867_45094_inner">
                <g clipPath="url(#clip0_9867_45094)">
                  <rect x="15.2871" y="-16.6411" width="8" height="80" transform="rotate(30 15.2871 -16.6411)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="29.1445" y="-8.64111" width="8" height="80" transform="rotate(30 29.1445 -8.64111)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="43" y="-0.641113" width="8" height="80" transform="rotate(30 43 -0.641113)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="56.8574" y="7.35889" width="8" height="80" transform="rotate(30 56.8574 7.35889)" fill="#FF0000" fillOpacity="0.16"/>
                  <rect x="70.7129" y="15.3589" width="8" height="80" transform="rotate(30 70.7129 15.3589)" fill="#FF0000" fillOpacity="0.16"/>
                </g>
              </g>
            </pattern>
            <clipPath id="clip0_9867_45094">
              <rect width="37" height="64" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="zones-container">
        <div className="zones-header">
          <h2>Areas</h2>
        </div>
        
        <div className="zones-list">
          {zones.map((zone) => {
            const svgIdMap: { [key: string]: string } = {
              '1': 'ambazone',
              '2': 'virtual-1',
              '3': 'virtual-2',
              '4': 'no-go-1',
              '5': 'no-go-2'
            }
            const isHovered = hoveredSvg === svgIdMap[zone.id]
            
            return (
              <div key={zone.id} className={`zone-item ${getZoneTypeClass(zone.type)}`}>
                <div 
                  className={`zone-header ${isHovered ? 'hovered' : ''}`}
                  onClick={() => toggleZone(zone.id)}
                  onMouseEnter={() => handleZoneMouseEnter(zone.id)}
                  onMouseLeave={handleZoneMouseLeave}
                >
                  <div className="zone-content-wrapper">
                    <div className="line-wrapper">
                      <div className={`line ${getZoneTypeClass(zone.type)}`}></div>
                    </div>
                    <div className="zone-title">
                      <span className="zone-name">{zone.name}</span>
                      <span className="zone-description">{zone.description}</span>
                    </div>
                    <div className="zone-chevron">
                      <img 
                        src="/svg/icon-chevron-down.svg" 
                        alt="chevron" 
                        className={`chevron-icon ${expandedZone === zone.id ? 'rotated' : ''}`}
                      />
                    </div>
                  </div>
                </div>
                
                {(expandedZone === zone.id || closingZone === zone.id) && (
                  <div className={`zone-expanded-content ${closingZone === zone.id ? 'closing' : ''}`}>
                    <button className="download-csv-btn">
                      Download CSV
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
