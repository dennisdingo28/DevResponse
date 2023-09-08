import Announce from "../ui/Announce"
import KeyFeature from "../ui/KeyFeature"
import BugRequestsContainer from "./BugRequestsContainer"
import BugRequests from "./BugRequestsContainer"
import BugStats from "./BugStats"
import ResolvedBugs from "./ResolvedBugs"

const StatisticsDashboard = () => {
  return (
        <div className="mt-4">
            <div className="my-3">
                <Announce message="We are one of the latest and modern platforms for development and tech related stuff." title="How to use? Here is a short overview about how you can use our platform for a faster bug fix, easy and efortless">
                    <div className="mt-4">
                        <div className="">
                            <p className="font-poppins text-[1.2em] text-center">
                                Our key <span className="font-bold text-blue-700">features</span>
                            </p>  
                            <div className="space-y-4 mt-3">
                                <KeyFeature keyFeature="Real Time" feature="data is going on" description="Your bug request will instantly be seen by all users of the app at the same time. How amazing is that? This will help to get a faster reponse to your problem !"/>
                                <KeyFeature keyFeature="Ping system" feature="for your bug !" description="As there might be more requests at the same time,the last who sends the request will be the first in this scenario. So with our ping system,your bug will be pinged on all screens ! Nothing is better than this !"/>
                                <KeyFeature keyFeature="Spam" feature="prevention" description="We've implemented a spam prevention system to make sure there will be no breach, and all system all up to go."/>
                            </div>
                        </div>
                        
                    </div>
                </Announce>
            </div>
            <BugStats/>
        </div>
  )
}

export default StatisticsDashboard