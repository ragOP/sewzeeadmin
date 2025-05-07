import React from "react";
import Typography from "../typography";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronDown, CloudUpload, PlusIcon, Pocket, Store } from "lucide-react";
import { singularize } from "@/utils/singularizing_word";
import { capitalize } from "@/utils/captilize";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "../ui/dropdown-menu";

const CustomActionMenu = ({
  title,
  total,
  onAdd,
  payload, 
  setPayload,
  handleSearch,
  disableAdd = false,
  disableBulkUpload = true,
  searchText,
  setOpenDialog,
}) => {
  return (
    <div className="flex items-center justify-between w-full my-3">
      <div>
        <Typography variant="p">
          Showing {total} {title}
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search"
          className="w-100"
          value={searchText}
          onChange={handleSearch}
        />
        {!disableBulkUpload && (
          <Button
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CloudUpload />
            <span>Bulk Upload</span>
          </Button>
        )}
        {!disableAdd && (
          <Button
            onClick={onAdd}
            className="flex items-center gap-2 cursor-pointer"
          >
            <PlusIcon />
            <span>Add {capitalize(singularize(title))}</span>
          </Button>
        )}
        {setPayload && (
           <DropdownMenu>
           <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-md border bg-card hover:bg-accent transition-colors">
             <span className="flex items-center gap-2">
               {payload.business_type === "brand" ? (
                 <>
                   <Pocket className="h-4 w-4" />
                   <span>Brand</span>
                 </>
               ) : (
                 <>
                   <Store className="h-4 w-4" />
                   <span>Boutique</span>
                 </>
               )}
             </span>
             <ChevronDown className="h-4 w-4 ml-2" />
           </DropdownMenuTrigger>
 
           <DropdownMenuContent>
             <DropdownMenuLabel>View Options</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <DropdownMenuItem onClick={() => setPayload({ ...payload, business_type: "brand" })}>
               <Pocket className="h-4 w-4 mr-2" />
               <span>Brand</span>
             </DropdownMenuItem>
             <DropdownMenuItem onClick={() => setPayload({...payload, business_type: "boutique"})}>
               <Store className="h-4 w-4 mr-2" />
               <span>Boutique</span>
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default CustomActionMenu;
