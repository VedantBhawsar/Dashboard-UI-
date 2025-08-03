import { useState } from "react"
import { Search, Command } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchPopup({ open, onOpenChange }: SearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const searchResults = [
    { title: "Dashboard", type: "Page", url: "/" },
    { title: "Tasks", type: "Page", url: "/tasks" },
    { title: "Calendar", type: "Page", url: "/calendar" },
    { title: "Contacts", type: "Page", url: "/contacts" },
    { title: "Settings", type: "Page", url: "/settings" },
  ].filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 top-[20%] translate-y-0">
        <div className="border-b border-border bg-background">
          <div className="flex items-center gap-3 p-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search pages, commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 text-base"
              autoFocus
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command className="h-3 w-3" />
              </kbd>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                K
              </kbd>
            </div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-4">
          {searchQuery && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground px-2 mb-3">
                Pages
              </div>
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-12 px-3"
                    onClick={() => {
                      onOpenChange(false)
                      setSearchQuery("")
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Search className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.type}</div>
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
          
          {!searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Start typing to search...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}