import styles from './Loading.module.scss';

interface IProps {
  active: boolean
}

export default function Loading({ active }: IProps) {
  
  return (
    <>
      {active && 
        <div className={styles.loader}></div>
      }
    </>
  )
}