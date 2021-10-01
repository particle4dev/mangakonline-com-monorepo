import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Section } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import TitleSection from '../TitleSection';

const debug = require('debug')('containers:SpecsSection');

function createData(name: string, calories: string) {
  return { name, calories};
}

const rows = [
  createData('Thương hiệu	', 'No Brand'),
  createData('Màu sắc	', 'Nhiều màu'),
  createData('Xuất xứ', 'Trung Quốc'),
  createData('Công suất', '150W'),
  createData('Kho hàng', '83'),
  createData('Gửi từ', 'Hà Nội'),
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontWeight: 400
  },

  root__tableCell: {
    paddingLeft: 0,
    width: 270
  }
}));

type ISpecsSectionProps = {}

function SpecsSection(props: ISpecsSectionProps) {
  debug('render');
  const classes = useStyles({});

  return (
    <Section id="specs" name="GLOBAL__specs">
      <TitleSection title="Thông số kỹ thuật"/>
      <TableContainer>
        <Table aria-label="specs table">
          <TableHead>
            <TableRow key="global__specs">
              <TableCell className={classes.root__tableCell}>Số nhận dạng sản phẩm toàn cầu</TableCell>
              <TableCell colSpan={3} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className={classes.root__tableCell} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left" colSpan={3}>{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}

if (process.env.NODE_ENV !== 'production') {
  SpecsSection.displayName = 'containers__SpecsSection';
}

SpecsSection.defaultProps = {};

export default React.memo(SpecsSection);
