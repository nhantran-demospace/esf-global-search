import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { locationStatisticDictionary } from 'helpers/location.helper';
import { Location } from 'models/location.model';

interface Level2TableProps {
    allLevel2Locations: Location[];
    selectedLevel2Ids: number[];
}

export const Level2Table = ({ selectedLevel2Ids, allLevel2Locations } : Level2TableProps) => {
    const isLevel2Selected = (level2: Location) =>
        selectedLevel2Ids.includes(level2.locationId) ||
        selectedLevel2Ids.length === 0;

    return (
        <Table marginTop="mt-4">
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Level 2</TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">Open</TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">
                        Pending Update
                    </TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">
                        Void Pending Actions
                    </TableHeaderCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {allLevel2Locations
                    .filter((level2) => isLevel2Selected(level2))
                    .map(({ locationId: level2Id, locationName: level2Name }) => (
                        <TableRow key={`${level2Id}-${level2Name}`}>
                            <TableCell>{level2Name}</TableCell>
                            <TableCell textAlignment="text-right">{locationStatisticDictionary[level2Id].openCount}</TableCell>
                            <TableCell textAlignment="text-right">{locationStatisticDictionary[level2Id].pendingUpdateCount}</TableCell>
                            <TableCell textAlignment="text-right">{locationStatisticDictionary[level2Id].voidPendingActionsCount}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};