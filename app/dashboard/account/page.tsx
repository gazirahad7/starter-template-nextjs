import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={session?.user?.name || ""}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={session?.user?.email || ""}
              disabled
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Profile editing functionality coming soon.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" disabled>
            Delete Account
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Account deletion functionality coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
