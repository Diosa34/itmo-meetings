import { Card } from 'primereact/card';

export default function ErrorPage({code, title, message}) {
    return (
        <div className="card p-5">
            <Card title={`${code} - ${title}`}>
                <p className="m-0">{message}</p>
            </Card>
        </div>
    )
}