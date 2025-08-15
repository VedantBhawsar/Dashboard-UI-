import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, User, Shield, UserPlus, X } from "lucide-react";

interface AddTeamMemberSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddTeamMemberSheet({ open, onOpenChange }: AddTeamMemberSheetProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Designer");
    const [permissions, setPermissions] = useState("Editor");

    const roles = [
        "Designer", "Marketer", "Sales Specialist", "Accounting", "Intern",
        "Logistics", "Senior Executive", "Ops Specialist", "Assistant"
    ];

    const handleSubmit = () => {
        console.log("Adding member:", { email, role, permissions });
        // Reset form
        setEmail("");
        setRole("Designer");
        setPermissions("Editor");
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <UserPlus className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <SheetTitle className="text-xl font-semibold">Add new member</SheetTitle>
                                <SheetDescription className="text-sm text-muted-foreground">
                                    Invite a new team member to your workspace
                                </SheetDescription>
                            </div>
                        </div>
                    </div>
                </SheetHeader>

                <div className="space-y-6 py-6">
                    {/* Email Section */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        </div>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="steven.well@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-11 bg-background border-border focus:border-primary transition-colors"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <div className="h-5 w-5 bg-primary/10 rounded-md flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary">@</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-border" />

                    {/* Permissions Section */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <Label className="text-sm font-medium">Permissions</Label>
                        </div>
                        <Select value={permissions} onValueChange={setPermissions}>
                            <SelectTrigger className="h-11 bg-background border-border">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Editor">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary" className="text-xs">Editor</Badge>
                                        <span className="text-sm text-muted-foreground">Can view and edit content</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Viewer">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className="text-xs">Viewer</Badge>
                                        <span className="text-sm text-muted-foreground">Can view content only</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Admin">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="default" className="text-xs">Admin</Badge>
                                        <span className="text-sm text-muted-foreground">Full access</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator className="bg-border" />

                    {/* Role Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <Label className="text-sm font-medium">Role</Label>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {roles.map((roleOption) => (
                                <Button
                                    key={roleOption}
                                    variant={role === roleOption ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setRole(roleOption)}
                                    className={`h-9 text-xs transition-all duration-200 ${role === roleOption
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "bg-background hover:bg-muted border-border hover:border-primary/50"
                                        }`}
                                >
                                    {roleOption}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Preview Section */}
                    {email && (
                        <>
                            <Separator className="bg-border" />
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-muted-foreground">Preview</Label>
                                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary">
                                                {email.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{email}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge variant="secondary" className="text-xs">{role}</Badge>
                                                <Badge variant="outline" className="text-xs">{permissions}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-border">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="h-10 px-6 border-border hover:bg-muted"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!email}
                        className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    >
                        Send Invite
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}