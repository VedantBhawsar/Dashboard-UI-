import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus, Shield } from "lucide-react";

interface UpgradePlanSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradePlanSheet({ open, onOpenChange }: UpgradePlanSheetProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Upgrade plan</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Payment Methods */}
          <div className="space-y-4">
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              {/* Visa Card */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="visa" id="visa" />
                <Label htmlFor="visa" className="flex items-center space-x-3 flex-1 cursor-pointer">
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
                </Label>
              </div>

              {/* Mastercard */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="mastercard" id="mastercard" />
                <Label htmlFor="mastercard" className="flex items-center space-x-3 flex-1 cursor-pointer">
                  <div className="w-8 h-5 flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                    <div className="w-4 h-4 bg-orange-400 rounded-full -ml-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Mastercard •••• 9182</p>
                    <p className="text-sm text-muted-foreground">Exp. 03/29</p>
                  </div>
                </Label>
              </div>

              {/* Apple Pay */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="applepay" id="applepay" />
                <Label htmlFor="applepay" className="flex items-center space-x-3 flex-1 cursor-pointer">
                  <div className="w-8 h-5 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs">🍎</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Apple Pay</p>
                  </div>
                </Label>
              </div>

              {/* PayPal */}
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center space-x-3 flex-1 cursor-pointer">
                  <div className="w-8 h-5 bg-primary rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">PayPal</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {/* Add Payment Method */}
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add payment method
            </Button>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold">Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pro Membership</span>
                <span className="font-medium">$3,549</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span className="font-medium">$177.45</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-primary">$3,726.45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Shield className="h-4 w-4" />
            <span>Encrypted secure checkout</span>
          </div>

          {/* Upgrade Button */}
          <Button className="w-full">
            Upgrade Plan
          </Button>

          {/* Powered by Stripe */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              powered by <span className="font-semibold">Stripe</span>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}