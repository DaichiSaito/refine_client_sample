import { IResourceComponentsProps } from '@refinedev/core'
import { Edit, useForm, useSelect } from '@refinedev/mantine'
import { NumberInput, TextInput, Checkbox, Select, MultiSelect } from '@mantine/core'

export const ArticleEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: {
      id: '',
      title: '',
      content: '',
      draft: '',
      user_id: '',
      category_ids: [],
    },
  })

  const articlesData = queryResult?.data?.data

  const { selectProps: userSelectProps } = useSelect({
    resource: 'users',
    defaultValue: articlesData?.user_id,
    optionLabel: 'name',
  })

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'categories',
    defaultValue: articlesData?.category_ids,
    optionLabel: 'name',
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput mt='sm' disabled label='Id' {...getInputProps('id')} />
      <TextInput mt='sm' label='Title' {...getInputProps('title')} />
      <TextInput mt='sm' label='Content' {...getInputProps('content')} />
      <Checkbox mt='sm' label='Draft' {...getInputProps('draft', { type: 'checkbox' })} />
      <Select mt='sm' label='User' {...getInputProps('user_id')} {...userSelectProps} />
      <MultiSelect
        mt='sm'
        label='Category'
        {...getInputProps('category_ids')}
        {...categorySelectProps}
        filterDataOnExactSearchMatch={undefined}
      />
    </Edit>
  )
}
