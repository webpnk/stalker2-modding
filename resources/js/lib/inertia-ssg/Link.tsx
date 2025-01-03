import {Link as InertiaLink, InertiaLinkProps, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

export default function Link(props: InertiaLinkProps) {
    const { props: { app: { staticMode } } } = usePage<PageProps>()

    if (staticMode) {
        const {
            as,
            data,
            method,
            headers,
            preserveScroll,
            preserveState,
            replace,
            only,
            except,
            onCancelToken,
            onBefore,
            onStart,
            onProgress,
            onFinish,
            onCancel,
            onSuccess,
            onError,
            queryStringArrayFormat,
            async,
            cacheFor,
            prefetch,
            ...htmlProps
        } = props;

        return <a {...htmlProps} />
    }

    return <InertiaLink {...props} />
}
