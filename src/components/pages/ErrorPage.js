import { Card } from 'primereact/card';

export default function ErrorPage({title, message}) {
    return (
        <div className="card p-5">
            <Card title={`${title}`}>
                <p className="m-0">{message}</p>
            </Card>
        </div>
    )
}