import { IResourceComponentsProps } from '@refinedev/core'
import { Create, useForm, useSelect } from '@refinedev/mantine'
import { TextInput, Checkbox, Select, MultiSelect } from '@mantine/core'

export const ArticleCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      title: '',
      content: '',
      draft: '',
      user_id: '',
      category_ids: [],
      created_at: '',
      updated_at: '',
      url: '',
    },
  })

  const { selectProps: userSelectProps } = useSelect({
    resource: 'users',
    optionLabel: 'name',
  })

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'categories',
    optionLabel: 'name',
  })

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
    </Create>
  )
}
