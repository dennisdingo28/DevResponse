import StatisticsDashboard from "@/components/Hero/StatisticsDashboard";
import Main from "@/components/Main/Main";
import Navbar from "@/components/Navbar/Navbar";

export default function Home({searchParams}:{searchParams: any}) {
  
  return (
    <main className="pb-3">
        <Navbar/>
        <StatisticsDashboard/>
        <div className="mt-4">
          <Main query={searchParams}/>
        </div>
    </main>
  )
}
