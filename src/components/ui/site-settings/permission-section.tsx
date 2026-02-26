import { Label } from "@radix-ui/react-label";
import { Field, FieldDescription } from "../field";
import RolesDropdown from "../team-members/rolesDropdown";
import { Role } from "@/types/role";
import { useRef } from "react";

interface PermissionSectionProps {
  label: string;
  description: string;
  input_name: string;
  preloadedRoles: Role[];
  selectedRole?: string | null;
  setChangeMade: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PermissionSection({ label, description, input_name, preloadedRoles, selectedRole, setChangeMade }: PermissionSectionProps) {
  const roleRef = useRef<HTMLInputElement>(null);

  return (
    <Field>
      <Label>{label}</Label>
      <FieldDescription>{description}</FieldDescription>
      {/* RolesDropdown updates this hidden input on selection */}
      <RolesDropdown
        selected={selectedRole || null}
        onSelect={(role: Role) => {
          if (roleRef.current) {
            roleRef.current.value = role.name;
            setChangeMade(true);
          }
        }}
        preloadedRoles={preloadedRoles}
      />
      <input type="hidden" name={input_name} ref={roleRef} />
    </Field>
  )
}