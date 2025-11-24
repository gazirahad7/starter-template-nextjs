import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, CreditCard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: DollarSign,
      change: "+20.1%",
      changeType: "positive" as const,
      description: "from last month",
    },
    {
      title: "Subscriptions",
      value: "+2,350",
      icon: Users,
      change: "+180.1%",
      changeType: "positive" as const,
      description: "from last month",
    },
    {
      title: "Sales",
      value: "+12,234",
      icon: CreditCard,
      change: "+19%",
      changeType: "positive" as const,
      description: "from last month",
    },
    {
      title: "Active Now",
      value: "+573",
      icon: Activity,
      change: "+201",
      changeType: "positive" as const,
      description: "since last hour",
    },
  ];

  const recentSales = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "OM",
      amount: "+$1,999.00",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "JL",
      amount: "+$39.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "IN",
      amount: "+$299.00",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      avatar: "WK",
      amount: "+$99.00",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "SD",
      amount: "+$39.00",
    },
  ];

  const recentActivity = [
    {
      user: "John Doe",
      action: "Created a new account",
      time: "2 minutes ago",
      status: "success",
    },
    {
      user: "Jane Smith",
      action: "Updated homepage content",
      time: "15 minutes ago",
      status: "success",
    },
    {
      user: "Mike Johnson",
      action: "Failed login attempt",
      time: "1 hour ago",
      status: "error",
    },
    {
      user: "Sarah Williams",
      action: "Changed password",
      time: "2 hours ago",
      status: "warning",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {session?.user?.name || "User"}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your application today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download</Button>
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            View Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Chart Placeholder */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Your revenue overview for the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center space-y-2">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Chart visualization would go here
                </p>
                <p className="text-xs text-muted-foreground">
                  Install recharts or chart.js for data visualization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
                    <AvatarFallback>{sale.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {sale.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest user activities and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <Badge
                        variant={
                          activity.status === "success"
                            ? "default"
                            : activity.status === "error"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/dashboard/users"
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-muted-foreground">
                  View and manage user accounts
                </p>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </a>
            <a
              href="/dashboard/cms"
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">Edit Homepage</p>
                <p className="text-sm text-muted-foreground">
                  Update homepage content and media
                </p>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </a>
            <a
              href="/dashboard/account"
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">Account Settings</p>
                <p className="text-sm text-muted-foreground">
                  Manage your profile and preferences
                </p>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
