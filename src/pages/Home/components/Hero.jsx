import { Link } from "react-router-dom"
import Logo from "../../../assets/images/digital-movies-logo.png"

export const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row dark:text-red-100 items-center">
        <div className="text my-5">
            <h1 className="text-5xl font-bold text-center lg:text-left dark:text-slate-100">
                  Movies, Music, Videos & More — For the Whole Family.
</h1>

            <p className="text-2xl my-7 px-1 text-center lg:text-left dark:text-slate-100">
                Download. Play. Watch. No ads, no drama — just pure entertainment.
            </p>

             
            <div className="flex justify-center lg:justify-start">
              
           <Link to="/products" type="button" className="text-white bg-red-600 hover:bg-red-700
              focus:ring-4 focus:ring-red-300 font-semibold rounded-sm text-lg px-8 py-3 mr-2 mb-2
              dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 tracking-wide">
              Explore!
           </Link>

</div>

        </div>

        {/* <div className="visual my-5 lg:max-w-xl">
            <img className="rounded-lg max-h-full" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=60" alt="CodeBook Hero Section" />
        </div> */}


        <div className="visual my-5 lg:max-w-xl">
            <img className="rounded-lg max-h-full" src={Logo} alt="Digiflix-Logo" />
        </div>

    </section>
  )
}
