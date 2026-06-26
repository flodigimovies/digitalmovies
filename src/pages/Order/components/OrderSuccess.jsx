import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { getLatestOrder } from "../../../services"

// ─── Google Drive helpers ─────────────────────────────────────────────────────
const isGoogleDrive = (url) =>
  typeof url === "string" && url.includes("drive.google.com")

const getGDriveDirectUrl = (url) => {
  const idMatch =
    url.match(/[?&]id=([^&]+)/) ||
    url.match(/\/file\/d\/([^/]+)/) ||
    url.match(/\/d\/([^/]+)/)
  const id = idMatch?.[1]
  return id
    ? `https://drive.google.com/uc?export=download&id=${id}&confirm=t`
    : url
}
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "digihubph_downloaded"

function getDownloaded() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} }
  catch { return {} }
}

// Key = "orderId_productId" — same product on a NEW order gets a fresh button
function makeKey(orderId, productId) {
  return `${orderId}_${productId}`
}

function markDownloaded(orderId, productId) {
  const current = getDownloaded()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [makeKey(orderId, productId)]: true }))
}

function wasDownloaded(orderId, productId) {
  return !!getDownloaded()[makeKey(orderId, productId)]
}

export const OrderSuccess = ({ data }) => {
  const [order, setOrder] = useState(data || null)
  const [loading, setLoading] = useState(true)
  const [downloadStatus, setDownloadStatus] = useState({})
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    async function fetchOrder() {
      try {
        const latestOrder = data || await getLatestOrder()
        setOrder(latestOrder)

        // Pre-mark products already downloaded for THIS specific order
        const preloaded = {}
        latestOrder.cart_list.forEach(product => {
          if (wasDownloaded(latestOrder.id, product.id)) {
            preloaded[product.id] = 'done'
          }
        })
        setDownloadStatus(preloaded)
      } catch (error) {
        console.error("Failed to fetch order:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [])

  function handleDownload(url, name, productId) {
    setDownloadStatus(prev => ({ ...prev, [productId]: 'downloading' }))

    const markDone = (productId) => {
      markDownloaded(order.id, productId)
      setDownloadStatus(prev => ({ ...prev, [productId]: 'done' }))
    }

    if (isGoogleDrive(url)) {
      const directUrl = getGDriveDirectUrl(url)
      window.open(directUrl, "_blank", "noopener,noreferrer")
      markDone(productId)
      return
    }

    // Cloudinary / any URL: fetch to blob → seamless download
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Network error")
        return res.blob()
      })
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = blobUrl
        a.download = name || "movie"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 5000)
        markDone(productId)
      })
      .catch(() => {
        window.open(url, "_blank")
        markDone(productId)
      })
  }

  return (
    <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded">
      <div className="my-5">
        <p className="bi bi-check-circle text-green-600 text-7xl mb-5"></p>
        <p>Thank you for your order! 🎉</p>
        {order && <p className="text-base mt-2">Order ID: {order.id}</p>}
        <p className="my-2 text-green-500 font-semibold text-lg">Payment Successful! ✅</p>
      </div>

      {!loading && order && (
        <div className="my-6 px-4">
          <div className="flex flex-col gap-4 items-center">
            {order.cart_list.map((product) =>
              product.dlUrl ? (
                <div key={product.id} className="w-full max-w-sm">

                  {/* Default: show download button */}
                  {!downloadStatus[product.id] && (
                    <button
                      onClick={() => handleDownload(product.dlUrl, product.name, product.id)}
                      className="flex items-center gap-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-base font-semibold px-8 py-3 rounded-xl shadow-lg transition-all w-full justify-center"
                    >
                      <i className="bi bi-download text-xl"></i>
                      Download {product.name}
                    </button>
                  )}

                  {/* Downloading */}
                  {downloadStatus[product.id] === 'downloading' && (
                    <div className="flex items-center justify-center gap-2 text-blue-500 text-base py-3">
                      <i className="bi bi-arrow-repeat animate-spin"></i>
                      Downloading {product.name}...
                    </div>
                  )}

                  {/* Done */}
                  {downloadStatus[product.id] === 'done' && (
                    <div className="flex items-center justify-center gap-2 text-green-500 text-base py-3">
                      <i className="bi bi-check-circle-fill"></i>
                      {product.name} downloaded successfully! ✅
                    </div>
                  )}

                </div>
              ) : (
                <span key={product.id} className="text-sm text-gray-400">
                  <i className="bi bi-clock mr-1"></i> {product.name} — Processing...
                </span>
              )
            )}
          </div>
        </div>
      )}

      {!loading && !order && (
        <p className="text-base text-gray-400 my-5">
          Could not load order. Please check your{" "}
          <Link to="/dashboard" className="text-blue-500 underline">Dashboard</Link> to download.
        </p>
      )}

      <div className="mt-8">
        <Link
          to="/products"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        >
          Continue Shopping <i className="ml-2 bi bi-cart"></i>
        </Link>
      </div>
    </section>
  )
}
