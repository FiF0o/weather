const convertTemp = (degree) => {
  const convertDegree =  (degree - 32) * 5 / 9;
  return convertDegree
};
export default convertTemp;


const convertToD = (degree) => {
  const centiDegree = (degree / 10);
  const intDegree = Math.round(centiDegree);
  return intDegree;

};
export default convertToD;
