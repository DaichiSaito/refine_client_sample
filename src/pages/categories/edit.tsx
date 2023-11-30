import { IResourceComponentsProps } from '@refinedev/core'
import { Edit, useForm } from '@refinedev/mantine'
import { NumberInput, TextInput } from '@mantine/core'

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
  // 以下と同じ
  // return <MantineEditInferencer />;
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: {
      id: '',
      name: '',
      created_at: '',
      updated_at: '',
      url: '',
    },
  })

  const categoriesData = queryResult?.data?.data
  // console.log(categoriesData)

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput mt='sm' disabled label='Id' {...getInputProps('id')} />
      <TextInput mt='sm' label='Name' {...getInputProps('name')} />
    </Edit>
  )
}
