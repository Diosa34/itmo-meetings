import {VirtualScroller} from "primereact/virtualscroller";
import {Skeleton} from "primereact/skeleton";
import {classNames} from "primereact/utils";

export default function ChannelMembers({members}) {
    const itemTemplate = (item, options) => {
        const className = classNames('flex align-items-center p-2', {
            'surface-hover': options.odd
        });

        return (
            <div className={className} style={{ height: options.props.itemSize + 'rem' }}>
                {item.login}
            </div>
        );
    };

    const loadingTemplate = (options) => {
        const className = classNames('flex align-items-center p-2', {
            odd: options.odd
        });

        return (
            <div className={className} style={{ height: '50px' }}>
                <Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />
            </div>
        );
    };

    return (
        <div className="card flex flex-wrap justify-content-center gap-5">
            <div>
                <span className="font-bold block mb-2">Участники сообщества</span>
                <VirtualScroller items={members} itemSize={5} itemTemplate={itemTemplate} showLoader delay={250} loadingTemplate={loadingTemplate} className="border-1 surface-border border-round" style={{ width: '20%'}} />
            </div>
        </div>
    );
}