import { getTypeColor } from '@/lib/colors';
import { capitalize } from '@/lib/utils';

export default function TypeBadge({ type }: { type: string }): React.ReactElement {
  return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${getTypeColor(type)}`}>{capitalize(type)}</span>;
}
