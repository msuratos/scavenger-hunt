import { useState } from 'react';
import { Button, FileInput, Group, Stepper, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';

export default function EditHunt(props) {
  const { hunt } = props;
  const [active, setActive] = useState(0);

  const huntForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      subtitle: '',
      startDate: null,
      endDate: null
    },
    validate: {
      title: (value) => !value || value === '' ? 'Invalid title' : null,
      startDate: (value) => !value || value === '' ? 'Invalid start date' : null,
      endDate: (value) => !value || value === '' ? 'Invalid end date' : null,
    },
  });

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const description = hunt === undefined ? 'Create Hunt' : 'Update Hunt';

  return (
    <>
      <Stepper active={active} onStepClick={setActive} size='xs'>
        <Stepper.Step label="First step" description={description}>
          <form onSubmit={huntForm.onSubmit((values) => { console.log(values); nextStep(); })}>
            <TextInput label="Title" placeholder="Enter a text" key={huntForm.key('title')} {...huntForm.getInputProps('title')} withAsterisk />
            <TextInput label="Subtitle" placeholder="Enter a text (optional)" key={huntForm.key('subtitle')} {...huntForm.getInputProps('subtitle')} />
            <DateTimePicker label="Start Date" description="Pick a date and time" placeholder="MM/DD/YYYY" valueFormat={'MM/DD/YYYY HH:mm'} key={huntForm.key('startDate')} {...huntForm.getInputProps('startDate')} withAsterisk />
            <DateTimePicker label="End Date" description="Pick a date and time" placeholder="MM/DD/YYYY" valueFormat={'MM/DD/YYYY HH:mm'} key={huntForm.key('endDate')} {...huntForm.getInputProps('endDate')} withAsterisk />

            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button type='submit'>Next step</Button>
            </Group>
          </form>
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Manage Items">
          {/* TODO: change to drag & drop or some type of list management */}
          <FileInput label="Picture" description="Picture of item" placeholder="Take a picture" withAsterisk /> {/* TODO: connect to AI image service to convert to text */}
          <TextInput label="Item Name" placeholder="Enter a text" withAsterisk /> {/* TODO: maybe only show if image upload doesn't work. Enter manually */}

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </>
  );
}