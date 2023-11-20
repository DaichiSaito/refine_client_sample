import { IResourceComponentsProps, useShow, useOne, useMany } from '@refinedev/core'
import { Show, NumberField, TextField, TagField, DateField, UrlField } from '@refinedev/mantine'
import { Title, Group } from '@mantine/core'

export const ArticleShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: 'users',
    id: record?.user_id || '',
    queryOptions: {
      enabled: !!record,
    },
  })

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: 'categories',
    ids: record?.category_ids || [],
    queryOptions: {
      enabled: !!record && !!record?.category_ids?.length,
    },
  })

  return (
    <Show isLoading={isLoading}>
      <Title my='xs' order={5}>
        Id
      </Title>
      <NumberField value={record?.id ?? ''} />
      <Title my='xs' order={5}>
        Title
      </Title>
      <TextField value={record?.title} />
      <Title my='xs' order={5}>
        Content
      </Title>
      <TextField value={record?.content} />
      <Title my='xs' order={5}>
        User
      </Title>
      {userIsLoading ? <>Loading...</> : <>{userData?.data?.name}</>}
      <Title my='xs' order={5}>
        Category
      </Title>
      {categoryIsLoading && record?.category_ids?.length ? (
        <>Loading...</>
      ) : (
        <>
          {record?.category_ids?.length ? (
            <Group spacing='xs'>
              {categoryData?.data?.map((category: any) => (
                <TagField key={category?.name} value={category?.name} />
              ))}
            </Group>
          ) : (
            <></>
          )}
        </>
      )}
      <Title my='xs' order={5}>
        Created At
      </Title>
      <DateField value={record?.created_at} />
      <Title my='xs' order={5}>
        Updated At
      </Title>
      <DateField value={record?.updated_at} />
      <Title my='xs' order={5}>
        Url
      </Title>
      <UrlField value={record?.url} />
    </Show>
  )
}
