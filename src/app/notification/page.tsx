import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as Icons from "lucide-react";

type IconName = "Terminal" | "Calendar" | "User";
type IconMap = {
  [name in IconName]: React.ComponentType<{ className: string }>
};

type Notification = {
  title: string;
  details: string;
  icon: IconName;
};

let notifications: Notification[] = [
  {
    title: "Heads up!",
    details: "You can add components to your app using the cli.",
    icon: "Terminal"
  },
  {
    title: "Upcoming Event",
    details: "You have an upcoming event for INOSKILL 2024 in Manav Rachna. Get Ready!",
    icon: "Calendar"
  },
  {
    title: "Welcome to your new account",
    details: "We hope you are having a great time. Please take few minutes to review our app on https://play.google.com/ems",
    icon: "User"
  }
];

export default function page() {
  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-5">Notifications</h2>
      <div className="flex flex-col gap-2 justify-start items-start">
        {notifications.map(d => {
          const Icon = (Icons as IconMap)[d.icon];
          return (
            <Alert>
              <Icon className="h-4 w-4" />
              <AlertTitle className="font-medium">{d.title}</AlertTitle>
              <AlertDescription className="opacity-80">{d.details}</AlertDescription>
            </Alert>
          );
        })}
      </div>
    </div>
  );
}
