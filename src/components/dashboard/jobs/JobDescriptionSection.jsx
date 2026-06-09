import { Fieldset } from "@heroui/react";
import ListCheck from "@gravity-ui/icons/ListCheck";
import ListUl from "@gravity-ui/icons/ListUl";
import Gift from "@gravity-ui/icons/Gift";
import { TextAreaField } from "./jobFormFields";

const JobDescriptionSection = () => (
  <Fieldset>
    <Fieldset.Legend className="mb-4 text-base font-semibold text-foreground">
      Job Details &amp; Description
    </Fieldset.Legend>

    <Fieldset.Group className="grid grid-cols-1 gap-4">
      <TextAreaField
        name="responsibilities"
        label="Responsibilities"
        placeholder="What will this person do day to day?"
        icon={ListCheck}
        isRequired
      />
      <TextAreaField
        name="requirements"
        label="Requirements"
        placeholder="Skills, experience, and qualifications needed."
        icon={ListUl}
        isRequired
      />
      <TextAreaField
        name="benefits"
        label="Benefits"
        placeholder="Perks, health, time off, equity, etc."
        icon={Gift}
        rows={3}
        optional
      />
    </Fieldset.Group>
  </Fieldset>
);

export default JobDescriptionSection;
