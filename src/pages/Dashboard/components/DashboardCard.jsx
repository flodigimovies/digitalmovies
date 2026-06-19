import { Link } from "react-router-dom"

export const DashboardCard = ({ order }) => {
  return (
    <div className="max-w-4xl m-auto p-2 mb-5 border dark:border-slate-700">
      <div className="flex justify-between text-sm m-2 font-bold dark:text-slate-200">
        <span>Order Id: {order.id}</span>
        <span>Total: ₱{order.amount_paid.toLocaleString()}</span>
      </div>
      {order.cart_list.map((product) => {
        const url = product.dlUrl;
        return (
          <div key={product.id} className="flex flex-wrap justify-between max-w-4xl m-auto p-2 my-5">
            <div className="flex">
              <Link to={"/products/" + product.id}>
                <img className="w-32 rounded" src={product.poster} alt={product.name} />
              </Link>
              <div>
                <Link to={"/products/" + product.id}>
                  <p className="text-lg ml-2 dark:text-slate-200">{product.name}</p>
                </Link>
                <div className="text-lg m-2 dark:text-slate-200">
                  <span>₱{product.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="self-center">
              {url ? (
                <a href={url} target="_blank" rel="noreferrer" download
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
                  <i className="bi bi-download"></i> Download
                </a>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  <i className="bi bi-clock"></i> Processing...
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )
}