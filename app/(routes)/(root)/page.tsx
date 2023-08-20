import StatisticsDashboard from "@/components/Hero/StatisticsDashboard";
import Main from "@/components/Main/Main";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main>
        <Navbar/>
        <StatisticsDashboard/>
        <div className="mt-4">
          <Main/>
        </div>
    </main>
  )
}
