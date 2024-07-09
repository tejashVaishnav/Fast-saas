import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "ShieldCheck",
    title: "Auth + Authorization",
    description:
      "powered by Next Auth. Secure your app with social logins, role-based access.",
  },
  {
    icon: "CircleDollarSign",
    title: "Subscription and Billing integration",
    description:
      "Effortlessly handle recurring billing, payment methods, and invoicing with stripe.",
  },

  {
    icon: "PictureInPicture",
    title: "Supabase with Prisma ORM",
    description:
      "Quick and simple data handling using Supabase and Prisma. Makes working with your app's information a breeze.",
  },
  {
    icon: "Timer",
    title: "Cron jobs",
    description:
      "Automatic check-ups for your newsletter list. Finds expired subscriptions and keeps your emails going to the right people.",
  },
  {
    icon: "Newspaper",
    title: "Email service integration",
    description:
      "Easy email sending with nodemailer and react-email. Gets your messages out to customers without any fuss.",
  },
  {
    icon: "SwatchBook",
    title: "Shadcn + tailwind",
    description:
      "Good-looking design made easy. Mix and match ready-made parts to make your app look great without the hard work.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="container py-12 sm:py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
