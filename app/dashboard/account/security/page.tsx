import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Key } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">
          Manage your account security and authentication methods
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication (2FA)
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">TOTP Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app to generate verification codes
              </p>
            </div>
            <Badge variant="outline">Not Enabled</Badge>
          </div>
          <Button disabled>Enable 2FA</Button>
          <p className="text-sm text-muted-foreground">
            Two-factor authentication setup coming soon.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled>Change Password</Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Password change functionality coming soon.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">
                  Last active: Just now
                </p>
              </div>
              <Badge>Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
