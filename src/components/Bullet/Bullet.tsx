import "./Bullet.scss";

interface Props {
    color: string;
}

const Bullet: React.FC<Props> = ({ color }) => {
    return (
        <div className="bullet--container">
            <div style={{ backgroundColor: color }} className="bullet"></div>
        </div>
    );
};

export default Bullet;
