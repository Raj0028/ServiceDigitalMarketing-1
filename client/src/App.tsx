import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found.tsx";
import Home from "@/pages/home.tsx";
import FacebookAds from "@/pages/facebook-ads.tsx";
import InstagramAds from "@/pages/instagram-ads.tsx";
import RedditAds from "@/pages/reddit-ads.tsx";
import YoutubeAds from "@/pages/youtube-ads.tsx";
import GoogleAds from "@/pages/google-ads.tsx";
import LinkedinAds from "@/pages/linkedin-ads.tsx";
import TiktokAds from "@/pages/tiktok-ads.tsx";
import SnapchatAds from "@/pages/snapchat-ads.tsx";
import FacebookThankYou from "@/pages/facebook-thank-you.tsx";
import InstagramThankYou from "@/pages/instagram-thank-you.tsx";
import RedditThankYou from "@/pages/reddit-thank-you.tsx";
import YoutubeThankYou from "@/pages/youtube-thank-you.tsx";
import GoogleThankYou from "@/pages/google-thank-you.tsx";
import LinkedinThankYou from "@/pages/linkedin-thank-you.tsx";
import TiktokThankYou from "@/pages/tiktok-thank-you.tsx";
import SnapchatThankYou from "@/pages/snapchat-thank-you.tsx";
import Admin from "@/pages/admin.tsx";
import Login from "@/pages/login.tsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/facebook-ads" component={FacebookAds} />
      <Route path="/instagram-ads" component={InstagramAds} />
      <Route path="/reddit-ads" component={RedditAds} />
      <Route path="/youtube-ads" component={YoutubeAds} />
      <Route path="/google-ads" component={GoogleAds} />
      <Route path="/linkedin-ads" component={LinkedinAds} />
      <Route path="/tiktok-ads" component={TiktokAds} />
      <Route path="/snapchat-ads" component={SnapchatAds} />
      <Route path="/facebook-thank-you" component={FacebookThankYou} />
      <Route path="/instagram-thank-you" component={InstagramThankYou} />
      <Route path="/reddit-thank-you" component={RedditThankYou} />
      <Route path="/youtube-thank-you" component={YoutubeThankYou} />
      <Route path="/google-thank-you" component={GoogleThankYou} />
      <Route path="/linkedin-thank-you" component={LinkedinThankYou} />
      <Route path="/tiktok-thank-you" component={TiktokThankYou} />
      <Route path="/snapchat-thank-you" component={SnapchatThankYou} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
