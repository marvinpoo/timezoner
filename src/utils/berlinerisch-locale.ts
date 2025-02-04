import { Locale } from 'date-fns';
import { de } from 'date-fns/locale';

const berlinerischLocale: Locale = {
  ...de,
  localize: {
    ...de.localize,
    day: (n: number, { width }: { width: 'narrow' | 'short' | 'abbreviated' | 'wide' }) => {
      const days = {
        narrow: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        short: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        abbreviated: ['Sonntach', 'Montach', 'Dienstach', 'Mittwoch', 'Donnastach', 'Freitach', 'Sonnabend'],
        wide: ['Sonntach', 'Montach', 'Dienstach', 'Mittwoch', 'Donnastach', 'Freitach', 'Sonnabend']
      };
      return days[width][n];
    },
    month: (n: number, { width }: { width: 'narrow' | 'short' | 'abbreviated' | 'wide' }) => {
      const months = {
        narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        short: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
        abbreviated: ['Jannua', 'Februa', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Aujust', 'Septemba', 'Oktoba', 'Novemba', 'Dezemba'],
        wide: ['Jannua', 'Februa', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Aujust', 'Septemba', 'Oktoba', 'Novemba', 'Dezemba']
      };
      return months[width][n];
    }
  }
};

export default berlinerischLocale;