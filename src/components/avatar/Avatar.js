import './Avatar.css';

export default function Avatar({ src }) {
  return (
    <img src={ src } className="avatar" alt="user's thumbnail"/>
  )
}
