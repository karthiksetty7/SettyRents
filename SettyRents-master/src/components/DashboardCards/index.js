import './index.css'

const DashboardCards = () => {
// temporary static data (later from API)
const data = [
{title: 'Buildings', count: 5},
{title: 'Floors', count: 12},
{title: 'Rooms', count: 48},
{title: 'Tenants', count: 40},
]

return ( <div className="cards-container">
{data.map(item => ( <div className="card" key={item.title}> <h3>{item.title}</h3> <p>{item.count}</p> </div>
))} </div>
)
}

export default DashboardCards
