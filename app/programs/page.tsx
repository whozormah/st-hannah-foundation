import PageHeader from "@/components/shared/PageHeader";
import ProgramsAreas from "@/components/sections/programs/ProgramsAreas";
import ProgramsFeatured from "@/components/sections/programs/ProgramsFeatured";
import ProgramsProcess from "@/components/sections/programs/ProgramsProcess";
import ProgramsStats from "@/components/sections/programs/ProgramsStats";
import ProgramsGetInvolved from "@/components/sections/programs/ProgramsGetInvolved";
import ProgramsCTA from "@/components/sections/programs/ProgramsCTA";

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Programs"
        subtitle="Creating opportunities, restoring dignity and transforming communities through sustainable impact initiatives."
      />

      <ProgramsAreas />
      <ProgramsFeatured />
      <ProgramsProcess />
      <ProgramsGetInvolved />
      <ProgramsCTA />
    </>
  );
}
