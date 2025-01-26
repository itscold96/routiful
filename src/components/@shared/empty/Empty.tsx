import S from './Empty.module.scss';

interface EmptyProps {
  text: string;
}

export default function Empty({ text }: EmptyProps) {
  return (
    <div className={S.emptyContainer}>
      <img src={'./images/icons/icon-sad.svg'} alt={'비어있음 이미지'} height={70} width={70} />
      <p className={S.text}>{text}</p>
    </div>
  );
}
