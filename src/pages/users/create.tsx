import { IResourceComponentsProps } from '@refinedev/core'
import { Create, useForm } from '@refinedev/mantine'
import { TextInput } from '@mantine/core'

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { name: '' },
  })

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput mt='sm' label='Name' {...getInputProps('name')} />
    </Create>
  )
}
