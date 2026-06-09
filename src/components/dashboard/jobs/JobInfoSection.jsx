import { Fieldset, Switch } from "@heroui/react";
import Briefcase from "@gravity-ui/icons/Briefcase";
import Tag from "@gravity-ui/icons/Tag";
import Clock from "@gravity-ui/icons/Clock";
import Calendar from "@gravity-ui/icons/Calendar";
import CircleDollar from "@gravity-ui/icons/CircleDollar";
import Sack from "@gravity-ui/icons/Sack";
import Globe from "@gravity-ui/icons/Globe";
import { SelectField, TextInputField } from "./jobFormFields";
import { JOB_CATEGORIES, JOB_TYPES, CURRENCIES } from "./jobFormOptions";

const JobInfoSection = ({ remote, setRemote }) => (
  <Fieldset>
    <Fieldset.Legend className="mb-4 text-base font-semibold text-foreground">
      Job Information
    </Fieldset.Legend>

    <Fieldset.Group className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextInputField
        name="title"
        label="Job Title"
        placeholder="e.g. Senior Product Designer"
        icon={Briefcase}
        isRequired
      />
      <SelectField
        name="category"
        label="Job Category"
        placeholder="Select a category"
        items={JOB_CATEGORIES}
        icon={Tag}
        isRequired
      />
      <SelectField
        name="type"
        label="Job Type"
        placeholder="Select job type"
        items={JOB_TYPES}
        defaultSelectedKey="Full Time"
        icon={Clock}
        isRequired
      />
      <TextInputField
        name="applicationDeadline"
        label="Application Deadline"
        type="date"
        icon={Calendar}
        isRequired
      />
    </Fieldset.Group>

    <Fieldset.Group className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <TextInputField
        name="salaryMin"
        label="Salary (Min)"
        placeholder="0"
        type="number"
        inputMode="numeric"
        icon={CircleDollar}
      />
      <TextInputField
        name="salaryMax"
        label="Salary (Max)"
        placeholder="0"
        type="number"
        inputMode="numeric"
        icon={CircleDollar}
      />
      <SelectField
        name="currency"
        label="Currency"
        placeholder="Currency"
        items={CURRENCIES}
        defaultSelectedKey="USD"
        icon={Sack}
      />
    </Fieldset.Group>

    <Fieldset.Group className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextInputField
        name="location"
        label="Location"
        placeholder="City, Country"
        icon={Globe}
        isRequired={!remote}
        isDisabled={remote}
      />
      <div className="flex items-end pb-1">
        <Switch isSelected={remote} onChange={setRemote}>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Content>Remote position</Switch.Content>
        </Switch>
      </div>
    </Fieldset.Group>
  </Fieldset>
);

export default JobInfoSection;
