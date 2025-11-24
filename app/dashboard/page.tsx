import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Activity, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Sessions",
      value: "89",
      icon: Activity,
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "CMS Pages",
      value: "1",
      icon: FileText,
      change: "0%",
      changeType: "neutral" as const,
    },
    {
      title: "Growth",
      value: "+23%",
      icon: TrendingUp,
      change: "+8%",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session?.user?.name || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your application today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-gray-600"
                  }
                >
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CMS content updated</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/dashboard/users"
                className="block rounded-lg border p-3 hover:bg-gray-50"
              >
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-muted-foreground">
                  View and manage user accounts
                </p>
              </a>
              <a
                href="/dashboard/cms"
                className="block rounded-lg border p-3 hover:bg-gray-50"
              >
                <p className="font-medium">Edit Homepage</p>
                <p className="text-sm text-muted-foreground">
                  Update homepage content
                </p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
