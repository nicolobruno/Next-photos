import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Photo } from '../types';
import BackArrow  from '../../../assets/arrow-back.svg';
import styles from './Photo.module.scss';

export default function Products() {
    const router = useRouter();
    const [ photo, setPhoto ] = useState<Photo>();
    const { id } = router.query;

    useEffect(() => {
        fetch(`https://picsum.photos/id/${id}/info`)
            .then(res => res.json())
            .then((data) => {
                setPhoto(data)
            })
    }, [id]);

    return (
        <div className={styles.container}>
            {photo && (
                <>  
                    <div className={styles.header}>
                        <Link href="/photos" className={styles.back}>
                            <Image
                                src={BackArrow}
                                alt=""
                                width={30}
                                height={30}
                                className={styles.arrowBack}
                            />
                        </Link>
                        <h1>Lorem Ipsum</h1>
                    </div>
                    <Image
                        src={photo.download_url}
                        alt=""
                        width={700}
                        height={500}
                        className={styles.photo}
                    />
                    <div className={styles.containerAuthor}>
                        <p className={styles.author}>Author</p>
                        <p className={styles.authorName}>{photo.author}</p>
                    </div>
                </>
            )}
        </div>
    )
}
