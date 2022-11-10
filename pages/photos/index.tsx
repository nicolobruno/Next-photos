import Image from 'next/image';
import Link from 'next/link';
import Photo from '../../types/Photo';
import styles from './Photos.module.scss';

const API = 'https://picsum.photos';

export async function getServerSideProps () {
    const data : Photo[] = await fetch(`${API}/v2/list?page=1&limit=10`).then(res => res.json());
    return { props: { data }};
}

type Props = {
    data: Photo[]
}

export default function Photos({ data }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Photos of the World</h1>
            {data.map((item : Photo) => (
                <Link href={`/photos/${item.id}`} key={item.id}>
                    <Image
                        className={styles.photo}
                        alt=""
                        src={item.download_url}                        
                        width={780}
                        height={550}
                    />
                </Link>
            ))}
        </div>
    )
}
