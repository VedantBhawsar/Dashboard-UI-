import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Mail, Phone, Building, MapPin, Globe, Phone as PhoneIcon, MessageSquare, User, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Contact {
  id?: number
  fullName: string
  email: string
  phone: string
  company: string
  address: string
  status: "Contact" | "Prospect" | "Lead" | "Customer" | "Churned"
  leadSource?: string
  notes?: string
  avatar?: string
}

interface AddContactSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (contact: Contact) => void
}

const statusOptions = [
  { value: "Contact", label: "Contact", color: "bg-blue-100 text-blue-700" },
  { value: "Prospect", label: "Prospect", color: "bg-blue-100 text-blue-700" },
  { value: "Lead", label: "Lead", color: "bg-orange-100 text-orange-700" },
  { value: "Customer", label: "Customer", color: "bg-green-100 text-green-700" },
  { value: "Churned", label: "Churned", color: "bg-gray-100 text-gray-700" },
]

const leadSources = [
  { value: "google-ad", label: "Google ad", icon: Globe, color: "text-blue-600" },
  { value: "facebook-ad", label: "Facebook ad", icon: Globe, color: "text-blue-600" },
  { value: "whatsapp-outreach", label: "WhatsApp outreach", icon: MessageSquare, color: "text-green-600" },
  { value: "inbound-call", label: "Inbound call", icon: PhoneIcon, color: "text-gray-600" },
  { value: "outbound-call", label: "Outbound call", icon: PhoneIcon, color: "text-gray-600" },
  { value: "personal-contact", label: "Personal contact", icon: User, color: "text-purple-600" },
]

export function AddContactSheet({ open, onOpenChange, onSave }: AddContactSheetProps) {
  const [formData, setFormData] = useState<Contact>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "Contact",
    leadSource: "",
    notes: "",
    avatar: "",
  })

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      status: "Contact",
      leadSource: "",
      notes: "",
      avatar: "",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      status: "Contact",
      leadSource: "",
      notes: "",
      avatar: "",
    })
  }

  const selectedLeadSource = leadSources.find(source => source.value === formData.leadSource)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] max-h-screen overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl">Add new contact</SheetTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-purple-500 text-white text-2xl">
                {formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : '👤'}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Change Photo
            </Button>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              placeholder="Enter contact name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className="pl-9"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+1 000 000 0000"
                  className="pl-9"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Company and Lead Source */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company"
                  placeholder="Enter company name"
                  className="pl-9"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Lead source</Label>
              <Select value={formData.leadSource} onValueChange={(value) => setFormData({ ...formData, leadSource: value })}>
                <SelectTrigger className="bg-background border-input">
                  <div className="flex items-center gap-2">
                    {selectedLeadSource && (
                      <selectedLeadSource.icon className={cn("h-4 w-4", selectedLeadSource.color)} />
                    )}
                    <SelectValue placeholder="Select source" />
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg">
                  {leadSources.map((source) => (
                    <SelectItem key={source.value} value={source.value} className="hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <source.icon className={cn("h-4 w-4", source.color)} />
                        <span>{source.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                placeholder="Enter address"
                className="pl-9"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Button
                  key={status.value}
                  type="button"
                  variant={formData.status === status.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, status: status.value as Contact["status"] })}
                  className={cn(
                    "transition-all",
                    formData.status === status.value 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-accent"
                  )}
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}