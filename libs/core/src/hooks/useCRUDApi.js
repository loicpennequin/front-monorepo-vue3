import { computed, unref } from 'vue';
import { useMutation } from 'vue-query';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';

export function useCRUDApi(
  { model, service, defaultQueryOptions = {}, defaultMutationOptions = {} },
  cb = () => ({})
) {
  const http = useHttp();
  const serviceInstance = new service({ http });
  const baseQueryKey = serviceInstance.endpoint;

  return {
    findAllQuery(findAllOptions = {}) {
      const queryKey = computed(() => {
        const { filters } = unref(findAllOptions);

        return `${baseQueryKey}?${serializeQueryString(unref(filters))}`;
      });

      const queryOptions = computed(() => {
        const {
          relations = [],
          itemsPerPage = 30,
          ...options
        } = findAllOptions;

        return {
          model,
          itemsPerPage,
          relations,
          ...options
        };
      });

      const queryFn = computed(() => {
        const { itemsPerPage, requestOptions, filters } = unref(findAllOptions);

        return ({ pageParam = { page: 1, itemsPerPage } }) => {
          return serviceInstance.findAll({
            ...defaultQueryOptions,
            ...requestOptions,
            params: {
              ...(requestOptions?.params || {}),
              ...pageParam,
              ...unref(filters)
            }
          });
        };
      });

      return useCollectionQuery(queryKey, queryFn, queryOptions);
    },

    findByIdQuery(
      id,
      { relations = [], requestOptions = {}, ...options } = {}
    ) {
      const queryKey = computed(() => `${baseQueryKey}/${id}`);

      const queryOptions = computed(() => ({
        model,
        relations,
        ...defaultQueryOptions,
        ...options
      }));

      return useModelQuery(
        queryKey,
        () => serviceInstance.findById(id, requestOptions),
        queryOptions
      );
    },

    updateMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `update:${baseQueryKey}`,
        ({ id, entity }) => serviceInstance.update(id, entity, requestOptions),
        { ...defaultMutationOptions, ...options }
      );
    },

    createMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `create:${baseQueryKey}`,
        entity => serviceInstance.create(entity, requestOptions),
        { ...defaultMutationOptions, ...options }
      );
    },

    deleteMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `delete:${baseQueryKey}`,
        id => serviceInstance.delete(id, requestOptions),
        { ...defaultMutationOptions, ...options }
      );
    },
    ...cb(serviceInstance, http)
  };
}
