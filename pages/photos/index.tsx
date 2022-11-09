import Image from 'next/image';
import Link from 'next/link';
import { Photo } from './types';
import styles from './Photos.module.scss';

const API = 'https://picsum.photos';

export async function getServerSideProps () {
    const data = await fetch(`${API}/v2/list?page=2&limit=30`).then(res => res.json());
    return { props: { data }};
}

type Props = {
    data: [Photo]
}

export default function Photos({ data }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Landscapes of the World</h1>
            {data.map((item : Photo) => (
                <Link href={`/photos/${item.id}`} key={item.id}>
                    <Image
                        className={styles.photo}
                        alt=""
                        src={item.download_url}                        
                        width={580}
                        height={420}
                    />
                </Link>
            ))}
        </div>
    )
}
