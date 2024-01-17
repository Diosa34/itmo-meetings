import {VirtualScroller} from "primereact/virtualscroller";
import {Skeleton} from "primereact/skeleton";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import MemberRoleForm from "../forms/MemberRoleForm";
import {Tag} from "primereact/tag";

export default function ChannelMembers({owners, admins, editors, members, blocked, channel, my_id}) {

        const itemTemplate = (item, options) => {
            const className = classNames('flex align-items-center p-2', {
                'surface-hover': options.odd
            });

            return (
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start">
                        <div className={className} style={{height: options.props.itemSize + 'rem'}}>
                            {item.username}
                        </div>
                    </div>
                    <div className="flex align-items-center sm:align-items-end justify-content-between">
                        {!(item.id === my_id) && (owners.filter((elem) => elem.id === my_id)).length !== 0 ?
                            <MemberRoleForm className="mr-2" channel_id={channel.id} member={item}/>
                        : null}
                        <Tag className="m-1 mt-2 ml-1" value={owners.includes(item) ? "Владелец" :
                            admins.includes(item) ? "Админ" :
                                editors.includes(item) ? "Редактор" :
                                    members.includes(item) ? "Участник" :
                                        blocked.includes(item) ? "Заблокирован" : null}></Tag>
                    </div>
                </div>
            );
        };

        const loadingTemplate = (options) => {
            const className = classNames('flex align-items-center p-2', {
                odd: options.odd
            });

            return (
                <div className={className} style={{height: '50px'}}>
                    <Skeleton width={options.even ? '60%' : '50%'} height="1.3rem"/>
                </div>
            );
        };

        return (
            <div className="card flex flex-wrap justify-content-center gap-5">
                    <div>
                        <span className="font-bold block mb-3 mt-4">Участники сообщества</span>
                        <VirtualScroller items={owners.concat(admins, editors, members.filter((elem) => elem.id !== owners[0].id), blocked)} itemSize={3} itemTemplate={itemTemplate} showLoader delay={250} loadingTemplate={loadingTemplate} className="border-1 surface-border border-round" style={{width: '180%', height: '70%'}}/>
                    </div>
            </div>
        );
    }