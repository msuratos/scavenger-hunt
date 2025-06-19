import { useState } from 'react';
import { Button, FileInput, Group, Stepper, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { IconCamera } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useAlertDispatch } from '../utils/AlertContext';

export default function EditHunt(props) {
  const { hunt, onChange } = props;
  const [active, setActive] = useState(0);

  const alertDispatch = useAlertDispatch();

  const huntForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      subtitle: '',
      startDate: null,
      endDate: null,
      clues: []
    },
    transformValues: (values) => ({
      title: values.title,
      subtitle: values.subtitle,
      startDate: values.startDate ? dayjs(values.startDate).toDate() : null,
      endDate: values.startDate ? dayjs(values.endDate).toDate() : null
    }),
    validate: {
      title: (value) => !value || value === '' ? 'Invalid title' : null,
      startDate: (value) => !value || value === null ? 'Invalid start date' : null,
      endDate: (value) => !value || value === null ? 'Invalid end date' : null,
    },
  });

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const isEdit = hunt === undefined;
  const description = isEdit ? 'Create' : 'Update';

  async function onHuntFormSubmit(values) {
    console.log(values);
    await onChange(values);
    alertDispatch({ show: true, type: 'success', message: `Successfully ${description.toLowerCase()}d hunt!` });
    nextStep();
  }

  return (
    <>
      <form onSubmit={huntForm.onSubmit(onHuntFormSubmit)}>
        <Stepper active={active} allowNextStepsSelect={false} onStepClick={setActive} iconPosition='right' size='xs'>
          <Stepper.Step label="First step" description={`${description} Hunt`}>
            <TextInput label="Title" placeholder="Enter a text" key={huntForm.key('title')} {...huntForm.getInputProps('title')} withAsterisk />
            <TextInput label="Subtitle" placeholder="Enter a text (optional)" key={huntForm.key('subtitle')} {...huntForm.getInputProps('subtitle')} />
            <DateTimePicker label="Start Date" description="Pick a date and time" placeholder="MM/DD/YYYY" valueFormat={'MM/DD/YYYY HH:mm'} key={huntForm.key('startDate')} {...huntForm.getInputProps('startDate')} withAsterisk />
            <DateTimePicker label="End Date" description="Pick a date and time" placeholder="MM/DD/YYYY" valueFormat={'MM/DD/YYYY HH:mm'} key={huntForm.key('endDate')} {...huntForm.getInputProps('endDate')} withAsterisk />

            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Next step</Button>
            </Group>
          </Stepper.Step>

          <Stepper.Step label="Second step" description="Manage Items">
            <Group>
              <FileInput label="Item Picture" leftSection={<IconCamera />} clearable withAsterisk /> {/* TODO: connect to AI image service to convert to text */}
              <TextInput label="Item Name" placeholder="Enter item name" withAsterisk /> {/* TODO: maybe only show if image upload doesn't work. Enter manually */}
            </Group>

            <Group justify="center" mt="md">
              <Button variant='outline' onClick={() => form.insertListItem('clues', { name: '', active: false, key: randomId() })}>
                Add Item
              </Button>
            </Group>

            {/* TODO: change to drag & drop or some type of list management */}
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button type='submit'>Save Hunt</Button>
            </Group>
          </Stepper.Step>
        </Stepper>
      </form>
    </>
  );
}