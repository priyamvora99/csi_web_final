import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Notices from './components/Notices.vue';
import Vid from './components/Videos.vue';
import Proto from './components/Protocols.vue';
import editVid from './components/editVideos.vue';
import editTab from './components/editTable.vue';
import editProto from './components/editProtocols.vue';
import editNotices from './components/editNotices.vue';
import Quiz from './components/Quiz.vue';
import Polls from './components/Polls.vue';
import Events from './components/Events.vue';
import addRole from './components/addRole.vue';
import accessList from './components/accessList.vue';
import csiMemberExcel from './components/csiMemberExcel.vue';
import start from './components/start.vue';
import participantsExcel from './components/participantsExcel.vue';
import editQuiz from './components/editQuiz.vue';
import editPolls from './components/editPolls.vue';
import intraColleges from './components/intraColleges.vue';
import userPoints from './components/userPoints.vue';

export default[
  {path:'/signUp',component:Signup},
  {path:'/',component:start},
  {path:'/Login',component:Login},
  {path:'/Home',component:Home},
  {path:'/Notices',component:Notices},
  {path:'/Videos',component:Vid},
  {path:'/Protocols',component:Proto},
  {path:'/Polls',component:Polls},
  {path:'/Quiz',component:Quiz},
  {path:'/Events',component:Events},
  {path:'/addRole',component:addRole},
  {path:'/accessList',component:accessList},
  {path:'/csiMemberExcel',component:csiMemberExcel},
  {path:'/participantsExcel',component:participantsExcel},
  {path:'/editVideos',component:editVid},
  {path:'/editTable',component:editTab},
  {path:'/editProtocols',component:editProto},
  {path:'/editNotices',component:editNotices},
  {path:'/editQuiz',component:editQuiz},
  {path:'/editPolls',component:editPolls},
  {path:'/intraColleges',component:intraColleges},  
  {path:'/userPoints',component:userPoints}
]
