import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { type Course, CourseCategory, CourseMode } from "../../backend";
import { CATEGORY_META, SEED_COURSES, formatFee } from "../../data/courses";
import { useActor } from "../../hooks/useActor";

const EMPTY_COURSE: Partial<Course> = {
  title: "",
  description: "",
  category: CourseCategory.english,
  mode: CourseMode.hybrid,
  modules: [],
  durationOptions: [],
  isActive: true,
};

export default function AdminCourses() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [_editCourse, setEditCourse] = useState<Course | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>(EMPTY_COURSE);
  const [modulesText, setModulesText] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: backendCourses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getAllCourses(),
    enabled: !!actor,
  });

  const courses =
    backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;

  const createMutation = useMutation({
    mutationFn: async (course: Course) => actor!.createCourse(course),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created");
      setShowAdd(false);
      setNewCourse(EMPTY_COURSE);
    },
    onError: () => toast.error("Failed to create course"),
  });

  const _updateMutation = useMutation({
    mutationFn: async (course: Course) => actor!.updateCourse(course),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course updated");
      setEditCourse(null);
    },
    onError: () => toast.error("Failed to update course"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => actor!.deleteCourse(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete course"),
  });

  const handleCreate = () => {
    const modules = modulesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const course: Course = {
      id: uuidv4(),
      title: newCourse.title!,
      description: newCourse.description!,
      category: newCourse.category!,
      mode: newCourse.mode!,
      modules,
      durationOptions: [
        { months: 3n, feeInr: 3000n },
        { months: 6n, feeInr: 6000n },
        { months: 12n, feeInr: 10000n },
      ],
      isActive: true,
    };
    createMutation.mutate(course);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Manage Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add, edit, or remove courses from the platform.
          </p>
        </div>
        <Button
          onClick={() => setShowAdd(true)}
          data-ocid="admin.courses.add_button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course, i) => {
                const meta = CATEGORY_META[course.category];
                return (
                  <TableRow
                    key={course.id}
                    data-ocid={`admin.courses.item.${i + 1}`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{meta?.icon}</span>
                        <span>{course.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {course.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {course.mode}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.modules.length}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          course.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {course.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditCourse(course)}
                          data-ocid={`admin.courses.edit_button.${i + 1}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(course.id)}
                          data-ocid={`admin.courses.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Add Course Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Course title"
                data-ocid="admin.courses.title.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Course description"
                data-ocid="admin.courses.description.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={newCourse.category}
                  onValueChange={(v) =>
                    setNewCourse((p) => ({
                      ...p,
                      category: v as CourseCategory,
                    }))
                  }
                >
                  <SelectTrigger data-ocid="admin.courses.category.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="computer">Computer</SelectItem>
                    <SelectItem value="singing">Singing</SelectItem>
                    <SelectItem value="govExam">Govt Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Mode</Label>
                <Select
                  value={newCourse.mode}
                  onValueChange={(v) =>
                    setNewCourse((p) => ({ ...p, mode: v as CourseMode }))
                  }
                >
                  <SelectTrigger data-ocid="admin.courses.mode.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Modules (one per line)</Label>
              <Textarea
                value={modulesText}
                onChange={(e) => setModulesText(e.target.value)}
                placeholder="Module 1&#10;Module 2&#10;Module 3"
                rows={4}
                data-ocid="admin.courses.modules.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAdd(false)}
              data-ocid="admin.courses.add.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={createMutation.isPending || !newCourse.title}
              data-ocid="admin.courses.add.submit_button"
            >
              {createMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              data-ocid="admin.courses.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              data-ocid="admin.courses.delete.confirm_button"
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
