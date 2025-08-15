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
import { AddTeamMemberSheet } from "@/components/add-team-member-sheet";
import { UpgradePlanSheet } from "@/components/upgrade-plan-sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Upload,
  Edit,
  Shield,
  CreditCard,
  Receipt,
  Bell,
  Plug,
  Camera,
  Linkedin,
  Twitter,
  User,
  Settings as SettingsIcon,
  Trash2,
  MoreHorizontal,
  FolderOpen,
  BarChart3,
  Mail,
  CheckCircle,
  HardDrive,
  MailIcon,
  Plus
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isAddMemberSheetOpen, setIsAddMemberSheetOpen] = useState(false);
  const [isUpgradePlanSheetOpen, setIsUpgradePlanSheetOpen] = useState(false);

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
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => setIsAddMemberSheetOpen(true)}
              >
                + Add new
              </Button>
            </div>

            {/* Pending Invites Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Pending invites</h4>
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-12 gap-4 items-center py-2 hover:bg-muted/30 rounded-lg px-2">
                    <div className="col-span-1">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </div>
                    <div className="col-span-3 flex items-center space-x-3">
                      <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">SW</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">steven.well@email.com</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge variant="outline" className="text-xs">Marketing</Badge>
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground">July 10, 2025</div>
                    <div className="col-span-2 text-sm text-muted-foreground">N/A</div>
                    <div className="col-span-1">
                      <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-600">Pending</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button variant="ghost" size="sm">⋯</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                          <AvatarImage src="https://images.unsplash.com/photo-1680540692052-79fde1108370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQyNjN8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcGVyc29ufGVufDB8MXx8fDE3NTUyMzU2NjN8MA&ixlib=rb-4.1.0&q=80&w=200" />
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <SettingsIcon className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Blossom Menezes */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQyNjN8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MHwxfHx8MTc1NTIzNTY3MXww&ixlib=rb-4.1.0&q=80&w=200" />
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <SettingsIcon className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Jason Smith */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1599768431736-c78b881ae983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQyNjN8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcGVyc29ufGVufDB8MXx8fDE3NTUyMzU2NjN8MA&ixlib=rb-4.1.0&q=80&w=200" />
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <SettingsIcon className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Susan Stevenson */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQyNjN8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MHwxfHx8MTc1NTIzNTY3MXww&ixlib=rb-4.1.0&q=80&w=200" />
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <SettingsIcon className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Remi Levinge */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQyNjN8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MHwxfHx8MTc1NTIzNTY3MXww&ixlib=rb-4.1.0&q=80&w=200" />
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <SettingsIcon className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Kevin Rupert */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQyNjN8MHwxfHNlYXJjaHw1fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcGVyc29ufGVufDB8MXx8fDE3NTUyMzU2NjN8MA&ixlib=rb-4.1.0&q=80&w=200" />
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
                          <AvatarImage src="https://images.unsplash.com/photo-1719835491911-99dd30f3f2dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQyNjN8MHwxfHNlYXJjaHw2fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcGVyc29ufGVufDB8MXx8fDE3NTUyMzU2NjN8MA&ixlib=rb-4.1.0&q=80&w=200" />
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
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Membership plans</h3>
              <p className="text-muted-foreground">View and manage your membership plan settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Starter Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">$1,299</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Perfect for teams just starting out.</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">5 users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">10 projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Basic analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Email support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Access to core features</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">5 GB file storage</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative border-primary">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white">Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Pro</CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">$3,549</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Perfect for teams wanting to scale.</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">10 users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">50 projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Advanced analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Access to core features + API tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">100 GB file storage</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => setIsUpgradePlanSheetOpen(true)}
                  >
                    Upgrade
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plus Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-xl">Pro Plus</CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">$6,899</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Perfect for large teams and businesses.</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">20 users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">100 projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Advanced analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Access to core features + API tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">500 GB file storage</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => setIsUpgradePlanSheetOpen(true)}
                  >
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Custom Quote Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Get in touch for a custom quote.</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Designed for large organizations that require a custom solutions to meet their needs.
                    </p>
                  </div>
                  <Button variant="default" className="bg-black text-white hover:bg-black/90">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Billing & Payments</h3>
              <p className="text-muted-foreground">Managed your payment methods and view invoices.</p>
            </div>

            {/* Payment Methods Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Payment methods</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visa Card */}
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input type="radio" name="payment" defaultChecked className="rounded" />
                  <div className="w-10 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Visa •••• 5089</p>
                    <p className="text-sm text-muted-foreground">Exp. 03/29</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Default
                  </Badge>
                </div>

                {/* Mastercard */}
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input type="radio" name="payment" className="rounded" />
                  <div className="w-8 h-5 flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                    <div className="w-4 h-4 bg-orange-400 rounded-full -ml-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Mastercard •••• 9182</p>
                    <p className="text-sm text-muted-foreground">Exp. 03/29</p>
                  </div>
                </div>

                {/* Apple Pay */}
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input type="radio" name="payment" className="rounded" />
                  <div className="w-8 h-5 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs">🍎</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Apple Pay</p>
                  </div>
                </div>

                {/* PayPal */}
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input type="radio" name="payment" className="rounded" />
                  <div className="w-8 h-5 bg-primary rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">PayPal</p>
                  </div>
                </div>
              </div>

              {/* Add Payment Method */}
              <Button variant="ghost" className="justify-start text-muted-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Add payment method
              </Button>
            </div>

            {/* Billing History Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Billing history</CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Receipt className="mr-2 h-4 w-4" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-3">
                    <div className="col-span-1">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </div>
                    <div className="col-span-4">Invoice</div>
                    <div className="col-span-2">Membership</div>
                    <div className="col-span-2">Billing Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Invoice Rows */}
                  <div className="space-y-3">
                    {/* July 2025 Invoice */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium">Invoice_July_2025</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-muted-foreground">PRO</span>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">July 01, 2025</div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-yellow-600">Pending</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* June 2025 Invoice */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium">Invoice_June_2025</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-muted-foreground">Starter</span>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">June 01, 2025</div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Paid</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* May 2025 Invoice */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium">Invoice_May_2025</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-muted-foreground">Starter</span>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">May 01, 2025</div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Paid</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* April 2025 Invoice */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium">Invoice_April_2025</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-muted-foreground">Starter</span>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Apr 01, 2025</div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Paid</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* March 2025 Invoice */}
                    <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2">
                      <div className="col-span-1">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium">Invoice_March_2025</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-muted-foreground">Starter</span>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">Mar 01, 2025</div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Paid</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

      {/* Add Team Member Sheet */}
      <AddTeamMemberSheet
        open={isAddMemberSheetOpen}
        onOpenChange={setIsAddMemberSheetOpen}
      />

      {/* Upgrade Plan Sheet */}
      <UpgradePlanSheet
        open={isUpgradePlanSheetOpen}
        onOpenChange={setIsUpgradePlanSheetOpen}
      />
    </div>
  );
}