import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Edit, 
  Shield, 
  Users, 
  CreditCard, 
  Receipt, 
  Bell, 
  Plug,
  Camera,
  Linkedin,
  Twitter
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account and preferences here.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notification">Notification</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile settings</CardTitle>
              <CardDescription>
                Manage your account and preferences here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cover and Avatar Section */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20"></div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Cover
                  </Button>
                </div>
                <div className="absolute -bottom-6 left-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-background">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        RA
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Ryan Almeida</h3>
                    <p className="text-muted-foreground">ryan.almeida@email.com</p>
                  </div>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <Input id="workspace-name" defaultValue="Ryan's Workspace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspace-url">Workspace URL (optional)</Label>
                  <div className="flex">
                    <span className="flex items-center px-3 border border-r-0 border-input bg-muted text-muted-foreground text-sm rounded-l-md">
                      www.website.com/
                    </span>
                    <Input 
                      id="workspace-url" 
                      className="rounded-l-none" 
                      placeholder="workspace"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and data.
                </p>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Enable 2FA for extra security</p>
                    <p className="text-xs text-muted-foreground">
                      Protect your account with two-factor authentication
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Team members</h3>
                <p className="text-muted-foreground">View and manage your team members.</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                + Add new
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-3">
                    <div className="col-span-1">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </div>
                    <div className="col-span-3">Team member</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Date added</div>
                    <div className="col-span-2">Last login</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-3">
                    {/* Ryan Almeida */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-blue-100 text-blue-600">RA</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Ryan Almeida</p>
                          <p className="text-sm text-muted-foreground">ryan.almeida@email.com</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="secondary">Admin</Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Aug 28, 2024</div>
                      <div className="col-span-2 text-sm text-muted-foreground">July 01, 2025</div>
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Online</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </div>

                    {/* Blossom Menezes */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-purple-100 text-purple-600">BM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Blossom Menezes</p>
                          <p className="text-sm text-muted-foreground">blossom.menezes@email.com</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">Project Head</Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Sep 15, 2024</div>
                      <div className="col-span-2 text-sm text-muted-foreground">Jun 28, 2025</div>
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">Offline</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </div>

                    {/* Jason Smith */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-green-100 text-green-600">JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Jason Smith</p>
                          <p className="text-sm text-muted-foreground">jason.smith@email.com</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">Designer</Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Dec 07, 2024</div>
                      <div className="col-span-2 text-sm text-muted-foreground">July 04, 2025</div>
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">Offline</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </div>

                    {/* Susan Stevenson */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-orange-100 text-orange-600">SS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Susan Stevenson</p>
                          <p className="text-sm text-muted-foreground">susan.1148@email.com</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">Sales Specialist</Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Jan 14, 2025</div>
                      <div className="col-span-2 text-sm text-muted-foreground">May 18, 2025</div>
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Online</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </div>

                    {/* Remi Levinge */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-pink-100 text-pink-600">RL</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Remi Levinge</p>
                          <p className="text-sm text-muted-foreground">remi.levinge@email.com</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">Accounting</Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Jan 27, 2025</div>
                      <div className="col-span-2 text-sm text-muted-foreground">July 02, 2025</div>
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Online</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </div>

                    {/* Kevin Rupert */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-indigo-100 text-indigo-600">KR</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Kevin Rupert</p>
                          <p className="text-sm text-muted-foreground">kevin.r@email.com</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">Logistics</Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Feb 19, 2025</div>
                      <div className="col-span-2 text-sm text-muted-foreground">July 06, 2025</div>
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Online</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </div>

                    {/* Mike McKenzie */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-teal-100 text-teal-600">MM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Mike McKenzie</p>
                          <p className="text-sm text-muted-foreground">mike.mckenzie22@email.com</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline">Marketing</Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Jun 13, 2025</div>
                      <div className="col-span-2 text-sm text-muted-foreground">July 03, 2025</div>
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">Offline</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Badge className="text-lg px-3 py-1">👑</Badge>
                </div>
                <div>
                  <h3 className="font-semibold">Free trial</h3>
                  <p className="text-sm text-muted-foreground">8 days left</p>
                </div>
              </div>
              <Button className="w-full">
                👑 Upgrade to PRO
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Receipt className="mr-2 h-5 w-5" />
                Billing & Invoices
              </CardTitle>
              <CardDescription>
                Manage your billing information and view invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No billing information available for free trial.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in browser
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing emails</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plug className="mr-2 h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription>
                Connect your favorite tools and services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No integrations configured yet. Connect your tools to enhance your workflow.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}